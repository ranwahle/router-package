import  {ConfirmModal} from './modals/confirm-moadl.js'


const imageExistGuard = async path => {

    if (!path) {
        console.error('no path')
        return false
    }
    const imageId = path.split('/')[2]

    if (!imageId) {
        return false
    }

    const response = await fetch(`/images/${imageId}`)

    let result = true
    if (!response.json) {
        result = false
    }
    try {
        const data = await response.json()
        result = !!data.content

    } catch {
        result = false
    }


    return result


}

const confirmExit = async () => {
    console.log('You will never exit')
    const confirmModal =  document.createElement('confirm-modal');
    confirmModal.comfirmQuestion = 'Are you sure?';
    document.body.appendChild(confirmModal);
    const result = await confirmModal.getUserResult();

    document.body.removeChild(confirmModal);

    return result;


}

export default [
    {path: '/', element: 'div', attributes: {is: 'images-container'}}
    ,
    {
        path: '/addImage',
        element: 'div',
        attributes: {is: 'add-image'},
        deactivateGuard: confirmExit
    }, {
        path: 'image/:index',
        element: 'div',
        attributes: {is: 'detailed-image'},
        guard: imageExistGuard
    }

]

