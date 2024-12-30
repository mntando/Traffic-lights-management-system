/** @type {import('tailwindcss').Config} */
module.exports = {
  	content: ["./src/**/*.{html,js,vue}"],
  	theme: {
    	extend: {
			colors: {
				gray: {
				  min : '#F9FAFB', // Very light gray
				},
			  },
		},
  	},
  	plugins: [],
}

