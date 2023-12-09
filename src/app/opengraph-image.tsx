import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'About Acme';
export const size = {
	width: 1200,
	height: 630
};

export const contentType = 'image/png';

// Image generation
const GetImage = async () =>
	new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100%',
					height: '100%',
					background:
						'linear-gradient(180deg, rgba(5,150,105,1) 0%, rgba(134,239,172,1) 100%)'
				}}
			>
				<img
					src={`${
						process.env.DEPLOY_URL ?? 'http://localhost:3000/'
					}Pokemon.svg`}
					alt="Pikachu"
					width="635"
					height="360"
				/>
				<div
					style={{
						fontSize: 96,
						padding: '1.5rem',
						borderRadius: '0.75rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: 'rgba(255,255,255,0.5)',
						boxShadow: '0px 20px 25px -5px rgba(0, 0, 0, 0.1)'
					}}
				>
					<span style={{ fontWeight: '800' }}>Pokémon Team Tool</span>
				</div>
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size
		}
	);

export default GetImage;
