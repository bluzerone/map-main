import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const routeTransitionAnimationsAuth = trigger('authAnimation', [
	transition('One => Two, One => Three, One => Fore, One => Five, Two => Three, Two => Fore, Two => Five, Three => Fore,Three => Five, Fore => Five', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: '0px',
				right: 0,
				width: '100%',
				height: '100%'
			})
		]),
		query(':enter', [style({ right: '-250px', opacity: 0 })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('0.2s ease-out', style({ right: '250px', opacity: 0 }))]),
			query(':enter', [animate('0.2s ease-out', style({ right: '0%', opacity: 1 }))])
		]),
		query(':enter', animateChild())
	]),
	transition('Two => One, Three => One, Three => Two, Fore => One, Fore => Two, Fore => Three, Five => One, Five => Two, Five => Three, Five => Fore', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: '0px',
				left: 0,
				width: '100%',
				height: '100%'
			})
		]),
		query(':enter', [style({ left: '-250px', opacity: 0 })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('0.2s ease-out', style({ left: '250px', opacity: 0 }))]),
			query(':enter', [animate('0.2s ease-out', style({ left: '0%', opacity: 1 }))])
		]),
		query(':enter', animateChild())
	])
]);
