import styled from '@emotion/styled';

type TooltipContainerProps = {
	isWrap: boolean;
	top: number;
	left: number;
};

type TooltipContentContainerProps = {
	height: number;
};

export const KbarTooltipsContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	padding: 0 10px;
	height: 0;
`;

export const TooltipContainer = styled.div<TooltipContainerProps>`
	display: flex;
	flex-direction: ${({ isWrap }) => (isWrap ? 'column' : 'row')};
	gap: 0 10px;
	width: calc(100% - 20px);
	position: absolute;
	top: ${({ top }) => `${top}px`};
	left: ${({ left }) => `${left}px`};
	overflow: hidden;

	& > div {
		flex-shrink: 0;
	}
`;

export const TooltipContentContainer = styled.div<TooltipContentContainerProps>`
	display: flex;
	gap: 10px;
	height: ${({ height }) => height}px;
	line-height: ${({ height }) => height}px;
	overflow: hidden;
	font-size: 16px;

	& > span {
		flex-shrink: 0;
	}

	@media (max-width: 800px) {
		font-size: 14px;
	}
`;

export const TooltipTitle = styled.span`
	font-weight: 600;
`;

export const TooltipContent = styled.span`
	font-weight: 400;
`;
