//   Train.jsx
//   
//  Descripción:
//   Este componente es el encargado de mostrar la página de entrenamiento de la aplicación.
//
// Contribuidores:
//
//  - Carlos Roberto Rocha Trejo el 22/03/2025 (
//    GitHub: https://github.com/RobertoRochaT
//    Linkedin: https://www.linkedin.com/in/carlosr-rocha
//  )
//  
//
import React, { useState, useEffect, useCallback } from 'react';

const VectorDBPage = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [filename, setFilename] = useState("");
    const [progress, setProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [archives, setArchives] = useState([]);
    const [link, setLink] = useState("");
    const [linkProgress, setLinkProgress] = useState(0);
    const [fetchedLinks, setFetchedLinks] = useState([]);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [selectedLinks, setSelectedLinks] = useState([]);
    const [baseUrl, setBaseUrl] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        onFileListRefresh();
    }, []);

    const onFileListRefresh = async () => {
        const response = await fetch(backendUrl + '/get_documents', { method: 'GET' });
        const data = await response.json();
        setArchives(data.documents);
        console.log("Archivos:", data.documents);
    };

    const onFileChange = (event) => {
        if (event.target.files) {
            const files = Array.from(event.target.files).filter(file => file.type === 'application/pdf');
            setSelectedFiles([...selectedFiles, ...files]);
        }
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        if (event.dataTransfer.files) {
            setSelectedFiles([...selectedFiles, ...event.dataTransfer.files]);
        }
    };

    const onStartUpload = async () => {
        if (selectedFiles.length === 0) {
            alert("Por favor, selecciona al menos un archivo.");
            return;
        }
    
        setProgress(0);
        setFilename("");
        setIsUploading(true);
    
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });
    
        try {
            const response = await fetch(backendUrl + '/embed_multiple', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Error al subir los archivos');
            }
    
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
    
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    setIsUploading(false);
                    setSelectedFiles([]);
                    onFileListRefresh();
                    break;
                }
    
                const data = decoder.decode(value);
                const { filename, totalChunks, chunksUpserted } = JSON.parse(data);
                const currentProgress = (chunksUpserted / totalChunks) * 100;
                setProgress(currentProgress);
                setFilename(`${filename} [${chunksUpserted}/${totalChunks}]`);
            }
    
            alert("Archivos subidos correctamente");
        } catch (error) {
            console.error("Error al subir los archivos:", error);
            alert("Error al subir los archivos");
        } finally {
            setIsUploading(false);
            setSelectedFiles([]);
            onFileListRefresh();
        }
    };

    const processStreamedProgress = async (response) => {
        const reader = response.body?.getReader();
        if (!reader) {
            console.error('Reader was not found');
            return;
        }

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    setIsUploading(false);
                    setSelectedFiles([]);
                    onFileListRefresh();
                    break;
                }

                const data = new TextDecoder().decode(value);
                const { filename, totalChunks, chunksUpserted } = JSON.parse(data);
                const currentProgress = (chunksUpserted / totalChunks) * 100;
                setProgress(currentProgress);
                setFilename(`${filename} [${chunksUpserted}/${totalChunks}]`);
            }
        } catch (error) {
            console.error("Error reading response: ", error);
        } finally {
            reader.releaseLock();
        }
    };

    const onDeleteFile = async (docId) => {
        console.log("Deleting file with ID:", docId);
        const response = await fetch(backendUrl + `/delete_document?id=${docId}`, {
            method: 'POST',
        });

        if (response.ok) {
            onFileListRefresh();
        } else {
            console.error('Error al eliminar el archivo');
        }
    };

    const removeSelectedFile = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    const handleLinkFetch = async () => {
        if (!link) {
            alert("Por favor, ingresa un enlace válido.");
            return;
        }

        setLinkProgress(0);
        setIsUploading(true);

        try {
            const response = await fetch(backendUrl + '/get_links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: link }),
            });

            if (!response.ok) {
                throw new Error('Error al obtener los enlaces');
            }

            const data = await response.json();
            setFetchedLinks(data.links);
            setIsLinkModalOpen(true);
        } catch (error) {
            console.error("Error al obtener los enlaces:", error);
            alert("Error al obtener los enlaces");
        } finally {
            setIsUploading(false);
        }
    };

    const handleCloseModal = () => {
        setIsLinkModalOpen(false);
        console.log(selectedLinks);
        setSelectedLinks([]);
    };

    const handleLinkSelection = (link) => {
        const newSelectedLinks = [...selectedLinks];
        const linkObject = { link };
    
        const isLinkSelected = newSelectedLinks.some((item) => item.link === link);
    
        if (isLinkSelected) {
            newSelectedLinks.splice(
                newSelectedLinks.findIndex((item) => item.link === link),
                1
            );
        } else {
            newSelectedLinks.push(linkObject);
        }
    
        setSelectedLinks(newSelectedLinks);
    };

    const handleLinkUpload = async () => {
        if (selectedLinks.length === 0) {
            alert("Por favor, selecciona al menos un enlace.");
            return;
        }
    
        if (!baseUrl) {
            alert("Por favor, ingresa una URL base.");
            return;
        }
    
        console.log("Enlaces seleccionados para subir:", selectedLinks.map(item => item.link));
        console.log("URL base:", baseUrl);
    
        setLinkProgress(0);
        setIsUploading(true);
    
        try {
            const linksPayload = selectedLinks.map((item) => item.link);
            console.log("Preparando para enviar:", { links: linksPayload, base_url: baseUrl });
    
            const response = await fetch(backendUrl + '/scrape_and_embed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    links: linksPayload,
                    base_url: baseUrl
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error en la respuesta del servidor:", errorData);
                throw new Error(errorData.detail || "Error uploading links");
            }
    
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
    
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    console.log("Proceso de subida completado");
                    setIsUploading(false);
                    setSelectedLinks([]);
                    setIsLinkModalOpen(false);
                    onFileListRefresh();
                    break;
                }
    
                const data = decoder.decode(value);
                console.log("Datos recibidos del servidor:", data);
                
                try {
                    const { totalLinks, linksProcessed } = JSON.parse(data);
                    const currentProgress = (linksProcessed / totalLinks) * 100;
                    setLinkProgress(currentProgress);
                    console.log(`Progreso: ${currentProgress}% - Procesados ${linksProcessed} de ${totalLinks} enlaces`);
                } catch (parseError) {
                    console.error("Error al parsear los datos del servidor:", parseError);
                }
            }
    
            alert("Enlaces subidos correctamente");
        } catch (error) {
            console.error("Error al subir los enlaces:", error);
            alert(`Error al subir los enlaces: ${error.message}`);
        } finally {
            setIsUploading(false);
            setSelectedLinks([]);
            onFileListRefresh();
        }
    };

    return (
        <main className="flex flex-col items-center p-24">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold">Update Knowledge Base</h1>
                    <p className="text-gray-600">Add new documents to your vector DB</p>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 grid gap-4 border rounded-lg p-6">
                            <div className="relative">
                                <button
                                    onClick={onFileListRefresh}
                                    className="absolute -right-4 -top-4 p-2 rounded-full hover:bg-gray-100"
                                >
                                    🔄
                                </button>
                                <label className="block text-sm font-medium text-gray-700">Files List:</label>
                                <ul className="mt-1 w-full border rounded-lg p-2">
                                    {archives.map((archive, index) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <span>{archive.file_path.split('/').pop()}</span>
                                            <button
                                                onClick={() => onDeleteFile(archive._id)}
                                                className="text-red-500"
                                            >
                                                🗑️
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
    
                            <div
                                className={`relative border-2 border-dashed rounded-lg p-6 ${
                                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    multiple
                                    onChange={onFileChange}
                                    className="mt-1 w-full p-2 border rounded-lg border-dashed focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-sm text-gray-500 mt-2">Arrastra y suelta archivos aquí o haz clic para seleccionar.</p>
                                {selectedFiles.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-700">Archivos seleccionados:</p>
                                        <ul className="mt-2">
                                            {selectedFiles.map((file, index) => (
                                                <li key={index} className="flex justify-between items-center">
                                                    <span>{file.name}</span>
                                                    <button
                                                        onClick={() => removeSelectedFile(index)}
                                                        className="text-red-500"
                                                    >
                                                        🗑️
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
    
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Ingresar Enlace:</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        onChange={(e) => setLink(e.target.value)}
                                        placeholder="https://example.com"
                                        className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleLinkFetch}
                                        className="p-2 rounded-lg hover:bg-gray-100"
                                    >
                                        📎
                                    </button>
                                </div>
                            </div>
                        </div>
    
                        <button
                            onClick={onStartUpload}
                            disabled={isUploading || selectedFiles.length === 0}
                            className="flex items-center justify-center p-6 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        >
                            <span className="text-2xl">📤</span>
                        </button>
                    </div>
    
                    {isUploading && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">File Name: {filename}</label>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-500 h-2.5 rounded-full"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <span className="text-xl animate-spin">🌀</span>
                            </div>
                        </div>
                    )}
    
                    {isLinkModalOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                            onClick={handleCloseModal}
                        >
                            <div
                                className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center p-4 border-b">
                                    <h2 className="text-xl font-bold">🌐 Selecciona los enlaces para subir</h2>
                                    <button
                                        onClick={handleCloseModal}
                                        className="text-gray-500 hover:text-gray-700"
                                        disabled={isUploading} // Deshabilitar el botón de cerrar durante la subida
                                    >
                                        ✖️
                                    </button>
                                </div>

                                <div className="overflow-y-auto p-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">URL Base:</label>
                                        <input
                                            type="text"
                                            value={baseUrl}
                                            onChange={(e) => setBaseUrl(e.target.value)}
                                            placeholder="https://example.com"
                                            className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            disabled={isUploading} // Deshabilitar el input durante la subida
                                        />
                                    </div>

                                    <ul className="space-y-2">
                                        {fetchedLinks.map((link, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLinks.some((item) => item.link === link)}
                                                    onChange={() => !isUploading && handleLinkSelection(link)} // Solo permitir cambios si no se está subiendo
                                                    className="w-4 h-4"
                                                    disabled={isUploading} // Deshabilitar los checkboxes durante la subida
                                                />
                                                <span className="text-sm break-all">{link}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-4 border-t">
                                    {/* Barra de progreso siempre visible cuando se está subiendo */}
                                    {isUploading && (
                                        <div className="mb-4">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700">Progreso de subida</span>
                                                <span className="text-sm font-medium text-gray-700">{Math.round(linkProgress)}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-blue-500 h-2.5 rounded-full"
                                                    style={{ width: `${linkProgress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={handleCloseModal}
                                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                                            disabled={isUploading} // Deshabilitar durante la subida
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleLinkUpload}
                                            disabled={!baseUrl || selectedLinks.length === 0 || isUploading} // Deshabilitar si no hay baseUrl, enlaces seleccionados o ya se está subiendo
                                            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                                        >
                                            {isUploading ? 'Subiendo...' : '📤 Subir seleccionados'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
    
                    
                </div>
            </div>
        </main>
    );
};

export default VectorDBPage;