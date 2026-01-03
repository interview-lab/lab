import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'], // 진입점
	format: ['cjs', 'esm'], // CommonJS(NestJS용) + ES Modules(Next.js/Vite용)
	dts: true, // TypeScript 타입 정의 파일(.d.ts) 생성
	splitting: false, // 코드 스플리팅 비활성화
	sourcemap: true, // 디버깅용 소스맵 생성
	clean: true, // 빌드 전 dist 폴더 정리
	treeshake: true, // 사용하지 않는 코드 제거
	minify: false, // 개발 편의를 위해 minify 비활성화
});
