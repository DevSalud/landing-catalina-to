// JS opcional para comportamiento de acordeón exclusivo (solo uno abierto a la vez)
// El atributo name="faq-accordion" solo está en Chrome moderno.
// Polyfill para Safari/Firefox:
const faqDetails = document.querySelectorAll('details[name="faq-accordion"]')
for (const targetDetail of faqDetails) {
	targetDetail.addEventListener('click', () => {
		for (const detail of faqDetails) {
			if (detail !== targetDetail) {
				detail.removeAttribute('open')
			}
		}
	})
}
