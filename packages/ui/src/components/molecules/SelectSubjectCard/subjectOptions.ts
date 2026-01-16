import type Icon from '@/components/atoms/Icon';

type SubjectOption = {
	icon: Parameters<typeof Icon>[0]['icon'];
	iconColor: string;
	title: string;
	description: string;
};

export const SUBJECT_OPTIONS = {
	network: {
		icon: 'IconNetwork',
		iconColor: '#137FEC',
		title: '네트워크',
		description: 'HTTP, TCP/IP, DNS 등 네트워크 핵심 프로토콜 및 통신 원리',
	},
	os: {
		icon: 'IconOS',
		iconColor: '#9747FF',
		title: '운영체제',
		description: '프로세스, 스레드, 메모리 관리 및 시스템 구조',
	},
	backend: {
		icon: 'IconDatabase',
		iconColor: '#16A34A',
		title: '백엔드',
		description: '데이터베이스, API 설계, 서버 아키텍처 및 보안',
	},
	dataStructure: {
		icon: 'IconDataStructure',
		iconColor: '#EA580C',
		title: '자료구조',
		description: 'Array, Stack, Queue, Graph 등 핵심 자료구조 개념',
	},
	frontend: {
		icon: 'IconNetwork',
		iconColor: '#EF4444',
		title: '프론트엔드',
		description: 'React, Browser, DOM, JavaScript 심화 질문',
	},
	random: {
		icon: 'IconRandom',
		iconColor: '#475569',
		title: '랜덤 모드',
		description: '모든 카테고리에서 무작위로 질문을 선정하여 실전 감각 향상',
	},
} as const satisfies Record<string, SubjectOption>;

export type SubjectKey = keyof typeof SUBJECT_OPTIONS;
