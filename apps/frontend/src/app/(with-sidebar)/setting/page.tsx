import { Atom } from '@interview-lab/ui';
import clsx from 'clsx';
import { cookies } from 'next/headers';
import Link from 'next/link';
import client from '@/configs/fetch';
import {
	articleStyle,
	buttonGroupStyle,
	buttonStyle,
	headerStyle,
	linkedButtonStyle,
	mainStyle,
	profileRowStyle,
	sectionStyle,
} from './page.css';

export default async function SettingPage() {
	const cookieStore = await cookies();
	const { data: profile } = await client.GET('/users/profile', {
		headers: {
			Cookie: cookieStore.toString(),
		},
	});

	const isGoogleLinked = profile?.registrationTypes.some(
		(registrationType) => registrationType.type === 'GOOGLE',
	);
	const isGithubLinked = profile?.registrationTypes.some(
		(registrationType) => registrationType.type === 'GITHUB',
	);

	const defaultRegistrationType = profile?.registrationTypes.find(
		(registrationType) => registrationType.isDefault,
	)?.type;

	return (
		<main className={mainStyle}>
			<header className={headerStyle}>
				<h1>설정</h1>
				<p>계정 정보 및 연동 설정을 관리합니다.</p>
			</header>
			<section className={sectionStyle}>
				<article className={articleStyle}>
					<h2>내 프로필</h2>
					<div className={profileRowStyle}>
						<div>
							<h3>사용자 이름</h3>
							<span>{profile?.username}</span>
						</div>
						<div>
							<h3>이메일</h3>
							<span>{profile?.email}</span>
						</div>
					</div>
				</article>
				<article className={articleStyle}>
					<h2>외부 계정 연결</h2>
					<div className={buttonGroupStyle}>
						<Link
							href={
								defaultRegistrationType === 'GOOGLE'
									? '#'
									: isGoogleLinked
										? `${process.env.NEXT_PUBLIC_API_SERVER}/auth/oauth/unlink/google`
										: `${process.env.NEXT_PUBLIC_API_SERVER}/auth/oauth/link/google`
							}
						>
							<Atom.TextButton
								icon="IconGoogle"
								className={clsx(
									buttonStyle,
									isGoogleLinked && linkedButtonStyle,
								)}
								disabled={defaultRegistrationType === 'GOOGLE'}
							>
								{isGoogleLinked ? 'Google 계정 연동 완료' : 'Google 계정 연동'}
							</Atom.TextButton>
						</Link>
						<Link
							href={
								defaultRegistrationType === 'GITHUB'
									? '#'
									: isGithubLinked
										? `${process.env.NEXT_PUBLIC_API_SERVER}/auth/oauth/unlink/github`
										: `${process.env.NEXT_PUBLIC_API_SERVER}/auth/oauth/link/github`
							}
						>
							<Atom.TextButton
								icon="IconGithub"
								className={clsx(
									buttonStyle,
									isGithubLinked && linkedButtonStyle,
								)}
								disabled={defaultRegistrationType === 'GITHUB'}
							>
								{isGithubLinked ? 'GitHub 계정 연동 완료' : 'GitHub 계정 연동'}
							</Atom.TextButton>
						</Link>
					</div>
					<p>
						계정 연동을 통해 DevPrep의 기능을 최대한 활용하세요. 연동된 계정은
						더 빠르고 안전한 로그인 경험을 제공하며, 서비스 간 데이터 동기화를
						지원할 수 있습니다. <br />
						<br />
						연동 과정에서 문제가 발생하면 고객 지원팀에 문의해 주세요.
					</p>
				</article>
			</section>
		</main>
	);
}
