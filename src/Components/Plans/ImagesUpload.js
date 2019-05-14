import React from 'react';
import ImageUploader from 'react-images-upload'
import PlanService from '../../Services/PlanService'

const customStyle ={width: '70%'}
 
class ImagesUpload extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: [] }
         this.onDrop = this.onDrop.bind(this)
         this.services = new PlanService()
    }
 
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        }, () => {

            let formData = new FormData();

            for (const file of this.state.pictures) {
                formData.append('imageUrl', file)
            }            
            this.services.handleUpload(formData)
            .then(response => {
                this.props.setImageUrls(response)
            })
            .catch(err => console.log(err))
        })
    }

    render() {
        return (
            <ImageUploader
                withIcon={true}
                fileContainerStyle={customStyle}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview={true}
            />
        );
    }
}

export default ImagesUpload