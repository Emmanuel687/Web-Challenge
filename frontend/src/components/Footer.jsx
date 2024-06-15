import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

const Footer = () => {
	const date = new Date().getFullYear();
	return (
		<Box
			sx={{
				position: "fixed",
				bottom: 0,
				left: 0,
				width: "100%",
				backgroundColor: "#FFFFFF",
				padding: "10px",
				textAlign: "center",
			}}
		>
			<p className="text-[#335C6E]">© {date} Ello All rights reserved.</p>
		</Box>
	);
};

export default Footer;
