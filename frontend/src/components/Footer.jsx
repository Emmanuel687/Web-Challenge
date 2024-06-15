import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

const Footer = () => {
	const date = new Date().getFullYear();
	return (
		<Box>
			<p class="text-center p-[90px]  text-[#335C6E]">
				{" "}
				© {date} Ello All rights reserved .
			</p>
		</Box>
	);
};

export default Footer;
