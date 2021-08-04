
class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [

                {
                    link: 'https://i.pinimg.com/originals/67/fa/40/67fa4031e7355e21b362ae62ed572356.jpg',
                    description: 'Porsche 911'
                },
                {
                    link: 'https://i.pinimg.com/originals/10/95/eb/1095eb0264ace768bf0ffc45b961bc1c.jpg',
                    description: 'Volkswagen Golf GTI mk1'
                },

                {
                    link: 'https://i.pinimg.com/originals/41/c0/b5/41c0b53264554f8ac2e2214e6c0e7c96.jpg',
                    description: 'Ferrari 275GTB'
                },
                {
                    link: 'https://i.pinimg.com/originals/5a/b2/f4/5ab2f478b99d197881d653f17de3adaf.jpg',
                    description: 'Saint Louis Mansion Drizzling'
                },
            ]
        };
    }

    answer(correct) {
        this.setState({
            correct
        });
    }

    render() {
        const state = this.state
        return (
            state.images.map( (i, index) => 
                <div className="gallery" key={index}>
                    <a target="_blank" href={i.link}>
                        <img src={i.link} alt={i.description}/>
                    </a>
                    <div className="desc">{i.description}</div>
                </div>
            )
        );
    }
}
ReactDOM.render(
    <Gallery />,
    document.getElementById('galleryContainer')
);