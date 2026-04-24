export default function PageHeader(props) {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold">
                    {props.title}
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    <span id="breadcrumb-home" className="text-gray-500">{props.bread}</span>
                    <span id="breadcrumb-separator" className="text-gray-500">/</span>
                    <span id="breadcrumb-current" className="text-gray-500">Order List</span>
                </div>
            </div>
            <div id="action-button">
                {props.onAdd && (
                    <button
                        id="add-button"
                        onClick={props.onAdd}
                        className="bg-hijau text-white px-4 py-2 rounded-lg"
                    >
                        Add {props.children}
                    </button>
                )}
            </div>
        </div>
    );
}