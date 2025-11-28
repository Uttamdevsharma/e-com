import React from 'react';

const TimelineStep = ({ step, order, isCompleted, isCurrent, icon, description }) => {
    // ⚠️ Note: For production, ensure your Tailwind config includes the dynamic colors
    // or use full class names to avoid JIT issues. Example uses dynamic names assuming support.
    
    // Icon styling
    const iconBgColor = isCompleted || isCurrent ? `bg-${icon.bgColor}` : 'bg-gray-200';
    const iconTextColor = isCompleted || isCurrent ? `text-${icon.textColor}` : 'text-gray-400';

    // Text styling
    const labelTextColor = isCompleted || isCurrent ? 'text-gray-900 font-bold' : 'text-gray-500';
    const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-700' : 'text-gray-500';

    // Card/Panel styling
    const cardBorder = isCurrent ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200';
    const cardShadow = isCurrent ? 'shadow-lg' : 'shadow-md';

    // Date/Time Logic (Only display date if the status is reached)
    const stepDate = isCompleted || isCurrent ? 
        new Date(order.updatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) 
        : 'Awaiting Update';

    return (
        // ms-6 pushes the item content over, creating space for the vertical line from parent <ol>
        <li className="mb-10 ms-6"> 
        
            {/* The Circle/Dot on the Line */}
            <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 
                ${iconBgColor} ${iconTextColor} shadow-md transition-all duration-300`}>
                
                {/* Use a green checkmark for completed steps for a strong indicator */}
                {isCompleted ? (
                    <i className="ri-check-line text-lg text-white font-bold bg-green-600 rounded-full p-0.5"></i>
                ) : (
                    <i className={`ri-${icon.iconName} text-sm`}></i>
                )}
            </span>
            
            {/* Step Content Card */}
            <div className={`p-4 bg-white border-l-4 ${cardBorder} rounded-lg ${cardShadow} 
                transition-all duration-300 hover:shadow-xl`}>
                
                <h3 className={`text-lg ${labelTextColor} flex items-center`}>
                    {step.label} 
                    {/* Badge for the current step */}
                    {isCurrent && (
                        <span className="text-xs font-normal ms-3 px-2 py-0.5 bg-blue-600 text-white rounded-full">
                            Current Status
                        </span>
                    )}
                </h3>

                <time className="block mb-1 text-xs font-medium leading-none text-gray-400">
                    {stepDate}
                </time>
                
                <p className={`text-sm font-normal ${descriptionTextColor}`}>
                    {description}
                </p>
            </div>
        </li>
    );
};

export default TimelineStep;