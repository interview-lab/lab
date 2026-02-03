import { Atom } from '@interview-lab/ui';
import {
	articleStyle,
	buttonGroupStyle,
	buttonStyle,
	headerStyle,
	mainStyle,
	profileRowStyle,
	sectionStyle,
} from './page.css';

export default function SettingPage() {
	return (
		<main className={mainStyle}>
			<header className={headerStyle}>
				<h1>설정</h1>
				<p>계절 정보 및 연동 설정을 관리합니다.</p>
			</header>
			<section className={sectionStyle}>
				<article className={articleStyle}>
					<h2>내 프로필</h2>
					<div className={profileRowStyle}>
						<div>
							<h3>사용자 이름</h3>
							<span>Snowari</span>
						</div>
						<div>
							<h3>이메일</h3>
							<span>ppes1149@gmail.com</span>
						</div>
					</div>
				</article>
				<article className={articleStyle}>
					<h2>외부 계정 연결</h2>
					<div className={buttonGroupStyle}>
						<Atom.TextButton icon="IconGoogle" className={buttonStyle}>
							Google 계정 연동
						</Atom.TextButton>
						<Atom.TextButton icon="IconGithub" className={buttonStyle}>
							GitHub 계정 연동
						</Atom.TextButton>
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
