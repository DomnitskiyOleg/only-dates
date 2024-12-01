import './styles.scss'

export default function Circle({ numberOfCircles }: { numberOfCircles: number }) {
    const radius = 265; // Радиус большого круга
    const smallCircleRadius = 3; // Радиус маленького круга

    const circles = Array.from({ length: numberOfCircles }, (_, i) => {
        const angle = (i * 360 / numberOfCircles) - 60; // Начинаем с 13 часов
        const x = radius + radius * Math.cos((angle * Math.PI) / 180) - smallCircleRadius;
        const y = radius + radius * Math.sin((angle * Math.PI) / 180) - smallCircleRadius;
        return { x, y };
    });

    return (
        <div className='container'>
            <div className="outer-circle">
                {circles.map((circle, index) => (
                    <div
                        key={index}
                        className="small-circle"
                        style={{ left: circle.x, top: circle.y }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

