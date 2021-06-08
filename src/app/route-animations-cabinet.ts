import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const routeTransitionAnimationsCabinet = trigger('triggerName', [
	transition('One => Two, One => Three, One => Fore, One => Five, One => Six, Two => Three, Two => Fore, Two => Five, Two => Six, Three => Fore, Three => Five, Fore => Five, Six => One, Six => Two, Six => Three, Six => Fore, Six => Five', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				right: 0,
				width: '100%'
			})
		]),
		query(':enter', [style({ right: '-110px', opacity: 0 })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('0.2s ease-out', style({ right: '110px', opacity: 0 }))]),
			query(':enter', [animate('0.2s ease-out', style({ right: '0%', opacity: 1 }))])
		]),
		query(':enter', animateChild())
	]),
	transition('Two => One, Three => One, Three => Two, Fore => One, Fore => Two, Fore => Three, Five => One, Five => Two, Five => Three, Five => Fore', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%'
			})
		]),
		query(':enter', [style({ left: '-110px', opacity: 0 })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('0.2s ease-out', style({ left: '110px', opacity: 0 }))]),
			query(':enter', [animate('0.2s ease-out', style({ left: '0%', opacity: 1 }))])
		]),
		query(':enter', animateChild())
	])
]);
