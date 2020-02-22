// Copyright (c) 2020 Oliver Lenehan. All rights reserved. MIT license.

type NotImplemented<T> = T;

export type Snowflake = string & { isSnowflake: true };
export type ISO8601 = string & { isISO8601: true };

/** What type of user. */
export enum UserFlags {
	/** No special attributes */
	NONE				= 0,
	/** Is a Discord Employee */
	EMPLOYEE			= 1 << 0,
	/** Is a Discord Partner */
	PARTNER				= 1 << 1,
	/** Helps with HypeSquad Events */
	HYPESQUAD_EVENTS	= 1 << 2,
	/** Is a Bug Hunter */
	BUG_HUNTER			= 1 << 3,
	/** Is in the House of Bravery */
	HOUSE_BRAVERY		= 1 << 6,
	/** Is in the House of Brilliance */
	HOUSE_BRILLIANCE	= 1 << 7,
	/** Is in the House of Balance */
	HOUSE_BALANCE		= 1 << 8,
	/** Was an early supporter */
	EARLY_SUPPORTER		= 1 << 9,
	/** Uses Discord Teams */
	TEAM_USER			= 1 << 10,
	/** Discord System user */
	SYSTEM				= 1 << 12
}

/** Type of discord premium subscription. */
export enum PremiumTypes {
	/** Lower tier nitro subscription. */
	NITRO_CLASSIC	= 1,
	/** Higher tier nitro subscription. */
	NITRO			= 2
}

/** User data object. */
export interface UserObject {
	/** ID of the user. */
	id:				Snowflake;
	/** User's name (not unique). */
	username:		string;
	/** User's discord tag. */
	discriminator:	string;
	/** Avatar hash */
	avatar?:		string;
	/** Is the user a bot? */
	bot?:			boolean;
	/** Is the user part of Discord Urgent Message System. */
	system?:		boolean;
	/** Whether the user has 2-factor authentication. */
	mfa_enabled?:	boolean;
	/** User's chosen language. */
	locale?:		string;
	/** Is the user's email verified. */
	verified?:		boolean;
	/** The user's email. */
	email?:			string;
	/** User account type flags. */
	flags?:			UserFlags;
	/** Type of nitro subscription that the user has. */
	premium_type?:	PremiumTypes;
}

export interface IntegrationAccountObject {
    id:		string;
    name:	string;
}

export interface IntegrationObject {
    id:                    Snowflake;
    name:                  string;
    type:                  string;
    enabled:               boolean;
    syncing:               boolean;
    role_id:               Snowflake;
    expire_behaviour:      number;
    expire_grace_period:   number;
    user:                  UserObject;
    account:               IntegrationAccountObject;
    synced_at:             ISO8601;
}

export enum VisibilityTypes {
	/** Only the user can see. */
	NONE		= 0,
	/** Everyone can see. */
	EVERYONE	= 1
}

/** JSON representation of a Connected Account. */
export interface ConnectionObject {
	/** Connected account id. */
	id:				string;
	/** The username of the connected account. */
	name:			string;
	/** The service connected (Steam, Twitch, Youtube, etc). */
	type:			string;
	/** Has the connected been revoked. */
	revoked:		boolean;
	/** Partial server integrations array. */
	integrations:	IntegrationObject[];
	/** Whether the connection is verified. */
	verified:		boolean;
	/** Whether the connection syncs with friends. */
	friend_sync:	boolean;
	/** Whether presence updates show from the connection. */
	show_activity:	boolean;
	/** Whether the connection is visible. */
	visibility:		VisibilityTypes;
}

/** Discord Gateway Opcodes */
export enum GatewayOpcode {
	/** Action an Event.  
		Client: `Receives` */
	DISPATCH				= 0,
	/** Ping the gateway.  
		Client: `Sends, Receives` */
	HEARTBEAT				= 1,
	/** Client Handshake.  
		Client: `Sends` */
	IDENTIFY				= 2,
	/** Update Discord Status.  
		Client: `Sends` */
	STATUS_UPDATE			= 3,
	/** Join/Move/Leave voice channels.  
		Client: `Sends` */
	VOICE_STATE_UPDATE		= 4,
	/** Resume closed gateway connection.  
		Client: `Sends` */
	RESUME					= 6,
	/** Ready to reconnect to gateway.  
		Client: `Receives` */
	RECONNECT				= 7,
	/** Request members of a guild.  
		Client: `Sends` */
	REQUEST_GUILD_MEMBERS	= 8,
	/** Client has an invalid session id.  
		Client: `Receives` */
	INVALID_SESSION			= 9,
	/** Sent after first connection, contains heartbeat time.  
		Client: `Receives` */
	HELLO					= 10,
	/** Acknowledges the heartbeat was received.  
		Client: `Receives` */
	HEARTBEAT_ACK			= 11
}

/** Discord Gateway Payload */
export interface GatewayPayload
{
	/** Payload Opcode */
	op: GatewayOpcode,
	/** Event Data */
	d: any,
	/** Sequence number (for resume / heartbeast) */
	s?: number,
	/** Event Name */
	t?: DispatchEvents
}

/** Discord Gatewat Dispatch Events */
type DispatchEvents =
	'READY' |
	'MESSAGE_CREATE'

export type PresenceStatus = 'online' | 'dnd' | 'idle' | 'invisible' | 'offline';

/** Discord Presence Structure */
export interface Presence {
	status: PresenceStatus;
	afk: boolean;
	since: number | null;
	game: Activity | null;
}

/** Discord Activity Structure */
export interface Activity {
	type: number;
	name: string;
	url?: string;
}

export enum ActivityTypes {
	GAME		= 0,
	STREAMING	= 1,
	LISTENING	= 2,
	CUSTOM		= 3
}

export const ActivityType = {
	'game': ActivityTypes.GAME,
	'streaming': ActivityTypes.STREAMING,
	'listening': ActivityTypes.LISTENING,
	'custom': ActivityTypes.CUSTOM,
}

/** NOT COMPLETE */
export interface GuildObject {
	id:								Snowflake;
	name:							string;
	ownerId:						Snowflake;
	region:							string;
	afkTimeout:						number;
	verificationLevel:				number;
	defaultMessageNotifications:	number;
	explicitContentFilter:			number;
	roles:							NotImplemented<'Role'>[];
	emojis:							NotImplemented<'Emoji'>[];
	features:						NotImplemented<'GuildFeature'>[];
	mfaLevel:						number;
	icon?:							string;
	splash?:						string;
	discovery_splash?:				string;
	owner?:							boolean;
	permissions?:					number;
	afkChannelId?:					Snowflake;
	embedEnabled?:					boolean;
	embedChannelId?:				Snowflake;
}
