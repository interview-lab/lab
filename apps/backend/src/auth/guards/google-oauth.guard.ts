import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Google OAuth 인증 가드
 *
 * @description Google OAuth 인증이 필요한 엔드포인트에 적용합니다.
 */
@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {}
