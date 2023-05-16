'use client';
import { useContext } from 'react';
import ToastContext from './toastContext';
import ToastProvider from './toastProvider';

const useToasts = () => useContext(ToastContext);
export { ToastProvider, useToasts }
