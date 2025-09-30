import { motion, transform } from 'motion/react'
import type { SVGProps } from 'react'
import { forwardRef } from 'react'

interface CardStackSVGProps extends SVGProps<SVGSVGElement> {
	backRef: React.Ref<SVGRectElement>
	middleRef: React.Ref<SVGRectElement>
	frontRef: React.Ref<SVGRectElement>
}

export const CardStackSVG = forwardRef<SVGSVGElement, CardStackSVGProps>(
	({ backRef, middleRef, frontRef, ...props }, ref) => (
		<svg
			viewBox='0 0 auto auto'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='card-stack-svg'
			{...props}
			ref={ref}
		>
			<g id='card-stack'>
				<motion.rect
					ref={backRef}
					id='back'
					width='100%'
					height='100%'
					fill='var(--color-cream-200)'
					style={{ rotate: '-2deg' }}
				/>
				<motion.rect
					ref={middleRef}
					id='middle'
					width='100%'
					height='100%'
					fill='var(--color-cream-100)'
					style={{ rotate: '2deg' }}
				/>
				<motion.rect
					ref={frontRef}
					id='front'
					width='100%'
					height='100%'
					fill='var(--color-cream-50)'
					style={{
						rotate: '0deg',
					}}
				/>
			</g>
		</svg>
	)
)
