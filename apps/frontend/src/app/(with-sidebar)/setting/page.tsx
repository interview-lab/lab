import { catchError } from '@interview-lab/shared';
import { Atom } from '@interview-lab/ui';
import clsx from 'clsx';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import client from '@/configs/fetch';
import type { paths } from '@/types/api';
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

type Provider =
	paths['/auth/oauth/link/{provider}']['get']['parameters']['path']['provider'];

const toggleOAuthLink = async (provider: Provider) => {
	'use server';

	const cookieStore = await cookies();

	const { data: profile } = await client.GET('/users/profile', {
		headers: {
			Cookie: cookieStore.toString(),
		},
	});

	const defaultRegistrationType = profile?.registrationTypes.find(
		(registrationType) => registrationType.isDefault,
	)?.type;

	if (defaultRegistrationType === provider) {
		return;
	}

	const isLinked = profile?.registrationTypes.some(
		(registrationType) => registrationType.type === provider,
	);

	if (isLinked) {
		const [error] = await catchError(
			client.DELETE('/auth/oauth/unlink/{provider}', {
				params: {
					path: { provider },
				},
				headers: {
					Cookie: cookieStore.toString(),
				},
			}),
		);

		if (error) {
			console.error(`Failed to unlink ${provider} account:`);
			return;
		}

		revalidatePath('/setting');
	} else {
		redirect(
			`${process.env.NEXT_PUBLIC_API_SERVER}/auth/oauth/link/${provider}`,
		);
	}
};

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
						<form action={toggleOAuthLink.bind(null, 'GOOGLE')}>
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
						</form>
						<form action={toggleOAuthLink.bind(null, 'GITHUB')}>
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
						</form>
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
