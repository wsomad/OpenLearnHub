import {useState, useEffect} from 'react';
import {IoCloseOutline} from 'react-icons/io5';

const ModalComponent = ({modalType, lessonData, onClose, onSubmit}) => {
    const [titleLesson, setTitleLesson] = useState('');
    const [duration, setDuration] = useState('');
    const [linkContent, setLinkContent] = useState('');
    const [uploadContent, setUploadContent] = useState(null);

    useEffect(() => {
        if (modalType === 'edit' && lessonData) {
            setTitleLesson(lessonData.title);
            setDuration(lessonData.duration || '');
            setLinkContent(lessonData.link || '');
            setUploadContent(lessonData.uploadContent || null);
        }
    }, [modalType, lessonData]);

    const handleClose = () => {
        if (onClose) onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!titleLesson || !duration) {
            alert('Title and Duration are required fields.');
            return;
        }

        // Create the new lesson data object
        const newLessonData = {
            title: titleLesson,
            duration: parseInt(duration, 10),
            link: linkContent,
            uploadContent,
        };

        // Pass the new data to the parent component via the onSubmit prop
        if (onSubmit) {
            onSubmit(newLessonData);
        }

        handleClose();
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='w-full max-w-lg p-6 bg-white rounded-3xl'>
                <form className='w-full' onSubmit={handleSubmit}>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-abhaya text-3xl font-bold'>
                            {modalType === 'edit'
                                ? 'Edit Lesson Content'
                                : 'Add Lesson Content'}
                        </h1>
                        <button
                            type='button'
                            className='text-3xl w-16 h-16 flex items-center justify-center'
                            onClick={handleClose}
                        >
                            <IoCloseOutline />
                        </button>
                    </div>

                    <div className='space-y-4'>
                        <div>
                            <label className='font-abhaya text-lg font-medium mb-1 block'>
                                Title Lesson
                            </label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-3xl p-3 bg-transparent font-abhaya'
                                type='text'
                                placeholder='Title Lesson'
                                value={titleLesson}
                                onChange={(e) => setTitleLesson(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className='font-abhaya text-lg font-medium mb-1 block'>
                                Duration (minutes)
                            </label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-3xl p-3 bg-transparent font-abhaya'
                                type='number'
                                placeholder='Duration in minutes'
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className='font-abhaya text-lg font-medium mb-1 block'>
                                Link Content
                            </label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-3xl p-3 bg-transparent font-abhaya'
                                type='text'
                                placeholder='Link Content'
                                value={linkContent}
                                onChange={(e) => setLinkContent(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className='font-abhaya text-lg font-medium mb-1 block'>
                                Upload Content
                            </label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-3xl p-3 bg-transparent font-abhaya'
                                type='file'
                                accept='.pdf,video/*'
                                onChange={(e) =>
                                    setUploadContent(e.target.files[0])
                                }
                            />
                        </div>
                    </div>

                    <div className='mt-8'>
                        <button
                            className='w-full py-3 rounded-3xl bg-primary text-white text-lg active:scale-[.98] font-abhaya'
                            type='submit'
                        >
                            {modalType === 'edit'
                                ? 'Edit Content'
                                : 'Add Content'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalComponent;