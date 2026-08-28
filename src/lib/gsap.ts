import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, CustomEase)

// Match the CSS tokens in styles/tokens.css exactly — one settle curve for
// reveals/transitions, one spring curve for hover-release only.
CustomEase.create('settle', '0.22, 1, 0.36, 1')
CustomEase.create('spring', '0.34, 1.56, 0.64, 1')

export { gsap, ScrollTrigger }
