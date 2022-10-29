export class LoadUserProfile {
  static readonly type = '[User] load user profile ';
}

export class LoadProfileSuccess {
  static readonly type = '[User] Profile successfully loaded';
}

export class LoadProfileFailed {
  static readonly type = '[User] Profile loading failed';
}
