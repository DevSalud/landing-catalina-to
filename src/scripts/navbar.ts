const navbar = document.getElementById('navbar') as HTMLElement

const applyScrollStyle = () => {
	if (window.scrollY > 20) {
		navbar.classList.add(
			'bg-white/80',
			'backdrop-blur-md',
			'shadow-sm',
			'border-b',
			'border-white/20',
		)
		navbar.classList.remove('bg-white')
	} else {
		navbar.classList.remove(
			'bg-white/80',
			'backdrop-blur-md',
			'shadow-sm',
			'border-b',
			'border-white/20',
		)
		navbar.classList.add('bg-white')
	}
}

// Estado inicial
applyScrollStyle()
window.addEventListener('scroll', applyScrollStyle, { passive: true })
