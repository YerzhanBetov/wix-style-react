import React from 'react';
import PropTypes from 'prop-types';
import style from './ImageViewer.scss';
import Tooltip from '../Tooltip';
import Trash3 from '../Icons/dist/components/Trash3';
import Replace from '../Icons/dist/components/Replace';
import Plus2 from '../Icons/dist/components/Plus2';
import WixComponent from '../BaseComponents/WixComponent';

class ImageViewer extends WixComponent {

  render() {
    const {
      imageUrl,
      onAddImage,
      onUpdateImage,
      onRemoveImage
    } = this.props;

    const tooltipCommonProps = {
      showDelay: 0,
      hideDelay: 0,
      align: 'center',
      placement: 'top',
      moveBy: {x: 2, y: 0}
    };

    return (
      <div className={`${style.container} ${imageUrl && style.hasLogo}`}>
        <div data-hook="add-image" className={style.addLogo} onClick={onAddImage}>
          <div className={style.dashedBorder}/>
          <div className={style.plusIcon}><Plus2 size="47px"/></div>
        </div>
        {!!imageUrl &&
        <div className={style.changeLogoContainer}>
          <div className={style.imageLayout}>
            <img data-hook="image-viewer-image" className={style.image} src={imageUrl}/>
          </div>
          <div className={style.imageBackground}>
            <div className={style.buttons}>
              <Tooltip content="Replace" {...tooltipCommonProps}>
                <div data-hook="update-image" className={style.button} onClick={onUpdateImage}>
                  <Replace size="1.2em"/>
                </div>
              </Tooltip>
              <Tooltip content="Remove" {...tooltipCommonProps}>
                <div data-hook="remove-image" className={style.button} onClick={onRemoveImage}>
                  <Trash3 size="1.2em"/>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

ImageViewer.propTypes = {
  imageUrl: PropTypes.string,
  onAddImage: PropTypes.func,
  onUpdateImage: PropTypes.func,
  onRemoveImage: PropTypes.func
};

export default ImageViewer;
