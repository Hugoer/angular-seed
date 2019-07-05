export interface IUser {
    accessToken: string;
    id: string;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    activated: boolean;
    langKey: string;
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    authorities: string[];
}

export interface IUserJWT {
    jti: string;
    exp: number;
    nbf: number;
    iat: number;
    iss: string;
    aud: string;
    sub: string;
    typ: string;
    azp: string;
    auth_time: number;
    session_state: string;
    acr: string;
    'allowed-origins': string[];
    'realm_access': string[];
    'resource_access': {
        'web_app': {
            roles: string[];
        },
        account: {
            roles: string[];
        }
    };
    scope: string;
    'email_verified': boolean;
    name: string;
    'preferred_username': string;
    'given_name': string;
    'family_name': string;
    email: string;
}
