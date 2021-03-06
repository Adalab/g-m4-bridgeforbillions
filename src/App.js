import React from 'react';
import 'antd/dist/antd.css';
import './styles/app.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import careerPath from './services/careerPath';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      careerInfo: [],
      attributeId: 1,
      defaultObject: {},
      isClicked: true
    };

    this.getAttributeId = this.getAttributeId.bind(this);
    this.getLevelInfo = this.getLevelInfo.bind(this);
  }

  componentDidMount() {
    this.getCareerInfo();
  }

  getAttributeId(event) {
    const currentAttributeId = parseInt(event.currentTarget.id, 10);
    const { isClicked, attributeId } = this.state;

    const newClicked = (currentAttributeId === attributeId && isClicked) || isClicked;

    this.setState({
      attributeId: currentAttributeId,
      isClicked: newClicked
    });
  }

  getCareerInfo() {
    careerPath()
      .then((data) => {
        const newData = data.map((item, index) => {
          return { ...item, newid: index + 1, currentLevel: 0 };
        });

        this.setState({
          careerInfo: newData,
          defaultObject: newData[0]
        });
      });
  }

  getLevelInfo(value) {
    const { careerInfo, attributeId } = this.state;
    const attributeLevel = careerInfo.find((item) => item.newid === attributeId);
    attributeLevel.currentLevel = value;

    this.setState({
      careerInfo: [...careerInfo]
    });
  }

  render() {
    const { careerInfo, attributeId, defaultObject, isClicked } = this.state;
    const attributeObject = careerInfo.find((item) => item.newid === attributeId);

    return (
      <div className="app">
        <Header />
        <Main
          careerInfo={careerInfo}
          attributeObject={attributeObject}
          getAttributeId={this.getAttributeId}
          defaultObject={defaultObject}
          getLevelInfo={this.getLevelInfo}
          isClicked={isClicked}
          attributeId={attributeId}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
