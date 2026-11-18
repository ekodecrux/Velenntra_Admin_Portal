CREATE TABLE `app_state` (
	`storageKey` varchar(191) NOT NULL,
	`eventId` varchar(128) NOT NULL DEFAULT 'global',
	`value` longtext NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `app_state_storageKey` PRIMARY KEY(`storageKey`)
);
--> statement-breakpoint
CREATE INDEX `app_state_event_id_idx` ON `app_state` (`eventId`);