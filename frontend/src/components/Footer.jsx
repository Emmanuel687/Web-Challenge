import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

const Footer = () => {
	const date = new Date().getFullYear();
	return (
		<Box>
			<p class="text-center"> © {date} Ello. All rights reserved.</p>
		</Box>
	);
};

export default Footer;
