type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

export function Logo({ width = 128, height = 128, className = '' }: LogoProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 128 128`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37.6374 109.741C26.7226 108.988 19.7597 106.918 18.8187 103.155C18.3483 96.5681 16.4664 78.6902 19.7596 72.5741C29.6394 66.4581 93.6229 65.5171 109.148 72.5741C110.56 83.395 111.971 103.155 111.03 105.977C110.336 108.059 104.287 108.486 101.15 108.8C84.5272 109.427 48.5522 110.494 37.6374 109.741Z"
        fill="#1A292C"
      />
      <path
        d="M95.0343 80.5721L33.4032 81.513C29.6394 93.557 32.9327 104.566 35.285 106.918C39.5192 106.918 88.9182 107.389 95.5048 105.507C98.5393 104.64 96.9161 87.1586 95.0343 80.5721Z"
        fill="#DBDCD4"
      />
      <path
        d="M49.399 107.859V68.8104H82.8021L106.325 99.3907L103.973 81.9835L123.733 89.5109C119.969 84.8063 112.63 75.5851 113.382 76.3379C114.135 77.0906 123.105 75.0833 127.496 73.9855L114.323 66.4581C118.087 63.7921 125.238 58.1778 123.733 57.0487C122.227 55.9196 111.501 55.01 106.325 54.6964L120.91 40.5824L97.857 41.9938L103.032 24.5865L81.8612 35.8777V19.4114L67.2767 35.8777L56.456 18L45.6353 36.8187L32.9327 27.4093L30.5803 45.7575L10.3503 41.9938L19.2891 57.0487L0 72.5741H17.4073L7.52747 95.627L17.4073 88.57V95.627L28.6985 81.0425L38.1078 105.507V82.9244L49.399 107.859Z"
        fill="#FFDF91"
      />
    </svg>
  );
}
