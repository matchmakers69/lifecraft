"use server";

import {  PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@/lib/auth";
import {  s3Client } from "@/config/aws";
import crypto from "crypto";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");


export type GetSignedURLParams = {
	fileType: string;
	fileSize: number;
	checksum: string;
};

export async function getSignedURL(type: string, size: number, checksum: string) {
	const session = await auth();
	if (!session) {
		return { failure: "Not authenticated" };
	}
	
	if (!ACCEPTED_IMAGE_TYPES.includes(type)) {
		return { failure: "Invalidy file type!" };
	}
	
	if(size > MAX_FILE_SIZE) {
		return { failure: "File too large!"}
	}

	const putObjectCommand = new PutObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME!,
		Key: generateFileName(),
		// Key: "test-file", // currently not unique - will be overwritten 
		ContentType: type,
		ContentLength: size,
		ChecksumSHA256: checksum,
		Metadata: {
			userId: session.user.id
		}
	  })
	
	const signedURL = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 60 });

	return { success: { url: signedURL } };
}
