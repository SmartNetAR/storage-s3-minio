const getPreSignedUploadUrl = async ( bucket, fileName ) => {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( { bucket, fileName } )
    } ;
    try {
        const response = await fetch( 'http://localhost:8089/s3upload/presigned', options ) ;
        const jsonResponse = await response.text() ;
        if ( response.ok ) {
            return jsonResponse ;
        }
        throw new Error( jsonResponse.message || 'error al obtener los datos' ) ;
    } catch ( error ) {
        console.error( error ) ;
        throw error ;
    }
};

const uploadImage = async ( image, uploadUrl ) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'image/*',
        },
        body: image,
    } ;
    try {
        const response = await fetch( new Request( uploadUrl ), options ) ;
        if ( !response.ok ) throw new Error( 'error al subir la imagen' ) ;
    } catch ( error ) {
        console.error( error ) ;
        throw error ;
    }
} ;