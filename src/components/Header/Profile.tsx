import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
	showProfileData: boolean;
}
export function Profile({ showProfileData = true }: ProfileProps) {
	return (
		<Flex align="center">
			{showProfileData && (
				<Box mr="4" textAlign="right">
					<Text>Nicholas Costa</Text>
					<Text color="gray.300" fontSize="small">
						nicholascostadev@gmail.com
					</Text>
				</Box>
			)}
			<Avatar
				size="md"
				name="Nicholas Costa"
				src="https://github.com/nicholascostadev.png"
			/>
		</Flex>
	);
}
