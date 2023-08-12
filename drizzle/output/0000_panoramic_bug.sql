CREATE TABLE `address` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`phoneNumber` text NOT NULL,
	`lodge` text NOT NULL,
	`area` text NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `cartItem` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quantity` integer NOT NULL,
	`productId` integer NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`status` text DEFAULT 'DRAFT' NOT NULL,
	`name` text NOT NULL,
	`image` text NOT NULL,
	`slug` text NOT NULL,
	`creatdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `couponCondition` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`couponId` text NOT NULL,
	`minAmount` integer NOT NULL,
	`maxAmount` integer,
	`startDate` integer NOT NULL,
	`endDate` integer NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `coupon` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`maxUses` integer DEFAULT 1 NOT NULL,
	`value` integer NOT NULL,
	`status` text DEFAULT 'DRAFT' NOT NULL,
	`openToAll` integer DEFAULT false,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `couponUsage` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`couponId` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `couponUser` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`couponId` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `customRequest` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`message` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `orderItem` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quantity` integer NOT NULL,
	`productId` integer NOT NULL,
	`price` integer NOT NULL,
	`orderId` text NOT NULL,
	FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `order` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'PLACED' NOT NULL,
	`total` integer NOT NULL,
	`userId` text NOT NULL,
	`paymentUrl` text,
	`reference` text NOT NULL,
	`verificationCode` text NOT NULL,
	`type` text DEFAULT 'ONLINE' NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP,
	`addressId` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`addressId`) REFERENCES `address`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `productCategory` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`productId` integer NOT NULL,
	`categoryId` integer NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `productImages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`image` text NOT NULL,
	`productId` integer NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`status` text DEFAULT 'DRAFT' NOT NULL,
	`name` text NOT NULL,
	`stock` integer DEFAULT 1 NOT NULL,
	`slug` text NOT NULL,
	`costPrice` integer NOT NULL,
	`image` text NOT NULL,
	`sellingPrice` integer,
	`description` text NOT NULL,
	`featured` integer DEFAULT false,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`avatar` text DEFAULT 'default' NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cartItem_productId_userId_unique` ON `cartItem` (`productId`,`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `category_slug_unique` ON `category` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `couponCondition_couponId_unique` ON `couponCondition` (`couponId`);--> statement-breakpoint
CREATE UNIQUE INDEX `coupon_code_unique` ON `coupon` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `couponUsage_couponId_userId_unique` ON `couponUsage` (`couponId`,`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `couponUser_couponId_userId_unique` ON `couponUser` (`couponId`,`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `order_reference_unique` ON `order` (`reference`);--> statement-breakpoint
CREATE UNIQUE INDEX `productCategory_productId_categoryId_unique` ON `productCategory` (`productId`,`categoryId`);--> statement-breakpoint
CREATE UNIQUE INDEX `productImages_productId_image_unique` ON `productImages` (`productId`,`image`);--> statement-breakpoint
CREATE UNIQUE INDEX `product_slug_unique` ON `product` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);