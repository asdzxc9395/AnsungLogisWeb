export function useFlex(size) {
    const getClassObject = () => {
      return {
        'flex': true,
        'flex-wrap': true,
        'lg:flex-6': size === 'lg',
        'sm:flex-6': size === 'sm',
      };
    };
  
    const getLeadingClasses = () => {
      return size === 'lg' ? 'lg:leading-10' : 'sm:leading-8';
    };
  
    const getInputClasses = () => {
      return size === 'lg' ? 'hidden lg:flex-3' : 'flex sm:flex-1';
    };
  
    return { getClassObject, getLeadingClasses, getInputClasses };
  }