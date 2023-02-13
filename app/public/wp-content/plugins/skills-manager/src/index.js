// Import CSS. 
// import './style.scss';
// import './editor.scss';
const { __ } = wp.i18n;
const { registerBlockType, query } = wp.blocks;
function RandomImage( { category } ) {
    // const src = 'https://placeimg.com/320/220/' + category;
    const fecha = new Date();
    console.log("fecha: ", fecha.toUTCString())
    return <p>{fecha.toUTCString()}</p>;
    return <img src={ src } alt={ category } />; 
}
registerBlockType( 'ourplugin/cv-skills', {
    title: __( 'Random Image' ),
    icon: 'format-image',
    category: 'common',
    keywords: [
        __( 'random' ),
        __( 'image' )
    ],
    attributes: {
        category: {
            type: 'string',
            default: 'nature'
        }
    },
    edit: function( props ) {
        const { attributes: { category }, setAttributes } = props;
        function setCategory( event ) {
            const selected = event.target.querySelector( 'option:checked' );
            setAttributes( { category: selected.value } );
            event.preventDefault();
        }
        return (
            <div className={ props.className }>
                <RandomImage category={ category } /> 
                <form onSubmit={ setCategory }>
                    <select value={ category } onChange={ setCategory }>
                        <option value="animals">Animals</option> 
                        <option value="arch">Architecture</option> 
                        <option value="nature">Nature</option> 
                        <option value="people">People</option> 
                        <option value="tech">Tech</option> 
                    </select> 
                </form> 
            </div> 
        );
    },
    save: function( props ) {
        const { attributes: { category } } = props;
        return (
            <div>
                <RandomImage category={ category } /> 
            </div> 
        );
    }
} );