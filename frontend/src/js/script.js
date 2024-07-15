const navMenuBtn = document.getElementById("nav-menu-btn");
console.log("Screw you ass holes!");

navMenuBtn.addEventListener("click", () => {
	let mobileMenu = document.getElementById("mobile-menu");
	let menuOpen = document.getElementById("menu-open");
	let menuClose = document.getElementById("menu-close");

	if (navMenuBtn.ariaExpanded) {
		mobileMenu.style.display = "none";
		navMenuBtn.ariaCollapsed = "true";
		menuClose.style.display = "block";
		menuOpen.style.display = "none";
	}	else {
		mobileMenu.style.display = "flex";
		navMenuBtn.ariaExpanded = "true";
		menuClose.style.display = "none";
		menuOpen.style.display = "block";
	}		
});

export default UserInterFace
