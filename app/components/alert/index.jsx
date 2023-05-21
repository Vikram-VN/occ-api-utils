
import React from 'react';
import { CheckBadgeIcon, InformationCircleIcon, EyeIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Alert as AlertComponent } from 'flowbite-react';
import Link from 'next/link';


export const success = (infoMessage, onDismiss = () => { }, link = '#') => {
    return (
        <React.Fragment>
            <div className='mt-2 mb-4 text-sm text-green-700 dark:text-green-800'>{infoMessage || 'More info about this info alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.'}
            </div><div className='flex'>
                <Link href={link}>
                    <button type='button' className='mr-2 inline-flex items-center rounded-lg bg-green-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-800 dark:hover:bg-green-900'>
                        <EyeIcon className='-ml-0.5 mr-2 h-4 w-4' />
                        View more
                    </button>
                </Link>
                <button type='button' className='rounded-lg border border-green-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-green-700 hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-300 dark:border-green-800 dark:text-green-800 dark:hover:text-white' onClick={onDismiss}>Dismiss</button>
            </div></React.Fragment>
    );
}

export const warning = (infoMessage, onDismiss = () => { }, link = '#') => {
    return (
        <React.Fragment>
            <div className='mt-2 mb-4 text-sm text-yellow-700 dark:text-yellow-800'>{infoMessage || 'More info about this info alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.'}
            </div><div className='flex'>
                <Link href={link}>
                    <button type='button' className='mr-2 inline-flex items-center rounded-lg bg-yellow-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-800 dark:hover:bg-yellow-900'>
                        <EyeIcon className='-ml-0.5 mr-2 h-4 w-4' />
                        View more
                    </button>
                </Link>
                <button type='button' className='rounded-lg border border-yellow-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-yellow-700 hover:bg-yellow-800 hover:text-white focus:ring-4 focus:ring-yellow-300 dark:border-yellow-800 dark:text-yellow-800 dark:hover:text-white' onClick={onDismiss}>Dismiss</button>
            </div></React.Fragment>
    );
}

export const failure = (infoMessage, onDismiss = () => { }, link = '#') => {
    return (
        <React.Fragment>
            <div className='mt-2 mb-4 text-sm text-red-700 dark:text-red-800'>{infoMessage || 'More info about this info alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.'}
            </div><div className='flex'>
                <Link href={link}>
                    <button type='button' className='mr-2 inline-flex items-center rounded-lg bg-red-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-800 dark:hover:bg-red-900'>
                        <EyeIcon className='-ml-0.5 mr-2 h-4 w-4' />
                        View more
                    </button>
                </Link>
                <button type='button' className='rounded-lg border border-red-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 dark:border-red-800 dark:text-red-800 dark:hover:text-white' onClick={onDismiss}>Dismiss</button>
            </div></React.Fragment>
    );
}


export const info = (infoMessage, onDismiss = () => { }, link = '#') => {
    return (
        <React.Fragment>
            <div className='mt-2 mb-4 text-sm text-blue-700 dark:text-blue-800'>{infoMessage || 'More info about this info alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.'}
            </div><div className='flex'>
                <Link href={link}>
                    <button type='button' className='mr-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-900'>
                        <EyeIcon className='-ml-0.5 mr-2 h-4 w-4' />
                        View more
                    </button>
                </Link>
                <button type='button' className='rounded-lg border border-blue-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 dark:border-blue-800 dark:text-blue-800 dark:hover:text-white' onClick={onDismiss}>Dismiss</button>
            </div></React.Fragment>
    );
}

export const successMessage = (message) => {
    return (
        <h3 className='text-lg font-medium text-green-700 dark:text-green-800'>
            {message || 'This is a success alert'}
        </h3>
    )
}

export const warningMessage = (message) => {
    return (
        <h3 className='text-lg font-medium text-yellow-700 dark:text-yellow-800'>
            {message || 'This is a warning alert'}
        </h3>
    )
}

export const failureMessage = (message) => {
    return (
        <h3 className='text-lg font-medium text-red-700 dark:text-red-800'>
            {message || 'This is a failure alert'}
        </h3>
    )
}

export const infoMessage = (message) => {
    return (
        <h3 className='text-lg font-medium text-blue-700 dark:text-blue-800'>
            {message || 'This is a info alert'}
        </h3>
    )
}

export const showMessage = (type, message) => {
    switch (type) {
        case 'failure':
            return failureMessage(message);
        case 'warning':
            return warningMessage(message);
        case 'info':
            return infoMessage(message)
        default:
            return successMessage(message);

    }
}

export const showInfoMessage = (type, message, onDismiss, link) => {
    switch (type) {
        case 'failure':
            return failure(message, onDismiss, link);
        case 'warning':
            return warning(message, onDismiss, link);
        case 'info':
            return info(message, onDismiss, link)
        default:
            return success(message, onDismiss, link);

    }
}

export const icons = {
    success: CheckBadgeIcon,
    info: InformationCircleIcon,
    warning: ExclamationCircleIcon,
    failure: XCircleIcon
}

const Alert = (props) => {

    return (
        <AlertComponent
            withBorderAccent={true}
            rounded={true}
            color='success'
            icon={icons[props.color]}
            className={`z-10 mt-4 mb-2`}
            {...props}
        >
            <span className='font-medium'>
                {props.message || 'Alert message'}
            </span>
        </AlertComponent>
    );

}

export default Alert;

export const AlertInfo = (props) => {

    return (
        <AlertComponent
            color='success'
            rounded={true}
            withBorderAccent={true}
            additionalContent={showInfoMessage(props.color, props.infoMessage, props.onDismiss, props.link)}
            icon={icons[props.color]}
            className='z-10 mt-4 mb-2'
            {...props}
        >
            {showMessage(props.color, props.message)}
        </AlertComponent>
    );
}

// Examplees:
// <Alert
// color='failure'
// icon={CheckBadgeIcon}
// onDismiss={function onDismiss() { return alert('Alert dismissed!') }}
// message='You are successfully logged in...'
// />

// <AlertInfo
// color='failure'
// icon={CheckBadgeIcon}
// onDismiss={function onDismiss() { return alert('Alert dismissed!') }}
// message='You are successfully logged in...'
// infoMessage='Test'
// />