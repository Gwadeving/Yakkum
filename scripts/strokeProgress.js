
const strokeInstances = {};

function buatStroke(refObject, configPath = {}) {
    const defaultConfig = {
        color: 'black',
        strokeWidth: 1,
        className: '',
        progress: 100,
        zIndex: 'auto',
        adjustOnResize: true
    };

    const config = {...defaultConfig, ...configPath};
    config.progress = Math.max(0, Math.min(100, config.progress));

    // Handle both selector string and DOM element
    const reffObject = typeof refObject === 'string' 
        ? document.querySelector(refObject) 
        : refObject;

    if(!reffObject) {
        console.error(`Element ${refObject} Tidak di Ketahui! Masukkan Element yang benar! contoh: .example || #example || example (Jika element adalah Tag HTML)`);
        return null;
    }

    // Generate unique ID jika className ada
    const instanceId = config.className ? `${config.className}-${Date.now()}` : `stroke-${Date.now()}`;
    
    // Fungsi untuk update posisi dan ukuran stroke
    function updateStrokePosition() {
        const rect = reffObject.getBoundingClientRect();
        const styles = window.getComputedStyle(reffObject);

        // Update border radius
        const borderRadius = {
            topLeft: parseFloat(styles.borderTopLeftRadius),
            topRight: parseFloat(styles.borderTopRightRadius),
            bottomRight: parseFloat(styles.borderBottomRightRadius),
            bottomLeft: parseFloat(styles.borderBottomLeftRadius)
        };

        const adjustedBorderRadius = {
            topLeft: Math.max(0, borderRadius.topLeft - config.strokeWidth/2),
            topRight: Math.max(0, borderRadius.topRight - config.strokeWidth/2),
            bottomRight: Math.max(0, borderRadius.bottomRight - config.strokeWidth/2),
            bottomLeft: Math.max(0, borderRadius.bottomLeft - config.strokeWidth/2)
        };

        const offset = config.strokeWidth / 2;
        const width = rect.width - config.strokeWidth;
        const height = rect.height - config.strokeWidth;

        // Build path data
        let pathData = `M ${offset + adjustedBorderRadius.topLeft},${offset}`;
        pathData += ` H ${width - adjustedBorderRadius.topRight + offset}`;
        
        if (adjustedBorderRadius.topRight > 0) {
            pathData += ` A ${adjustedBorderRadius.topRight},${adjustedBorderRadius.topRight} 0 0 1 ${width + offset},${offset + adjustedBorderRadius.topRight}`;
        }

        pathData += ` V ${height - adjustedBorderRadius.bottomRight + offset}`;
        if (adjustedBorderRadius.bottomRight > 0) {
            pathData += ` A ${adjustedBorderRadius.bottomRight},${adjustedBorderRadius.bottomRight} 0 0 1 ${width - adjustedBorderRadius.bottomRight + offset},${height + offset}`;
        }

        pathData += ` H ${offset + adjustedBorderRadius.bottomLeft}`;
        if (adjustedBorderRadius.bottomLeft > 0) {
            pathData += ` A ${adjustedBorderRadius.bottomLeft},${adjustedBorderRadius.bottomLeft} 0 0 1 ${offset},${height - adjustedBorderRadius.bottomLeft + offset}`;
        }

        pathData += ` V ${offset + adjustedBorderRadius.topLeft}`;
        if (adjustedBorderRadius.topLeft > 0) {
            pathData += ` A ${adjustedBorderRadius.topLeft},${adjustedBorderRadius.topLeft} 0 0 1 ${offset + adjustedBorderRadius.topLeft},${offset}`;
        }

        // Update SVG dan wrapper
        wrapper.style.top = `${rect.top + window.scrollY}px`;
        wrapper.style.left = `${rect.left + window.scrollX}px`;
        wrapper.style.width = `${rect.width}px`;
        wrapper.style.height = `${rect.height}px`;
        
        svg.setAttribute('width', rect.width);
        svg.setAttribute('height', rect.height);
        
        path.setAttribute('d', pathData);
        
        // Update progress jika ada perubahan ukuran
        const pathLength = path.getTotalLength();
        const visibleLength = (pathLength * config.progress) / 100;
        path.setAttribute('stroke-dasharray', `${visibleLength} ${pathLength}`);
    }

    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.pointerEvents = 'none';
    wrapper.style.zIndex = config.zIndex;
    wrapper.dataset.strokeId = instanceId;

    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.overflow = 'visible';

    // Create path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', config.color);
    path.setAttribute('stroke-width', config.strokeWidth);
    path.setAttribute('stroke-linecap', 'round');
    
    if (config.className) {
        path.setAttribute('class', config.className);
    }

    svg.appendChild(path);
    wrapper.appendChild(svg);
    document.body.appendChild(wrapper);

    // Initial update
    updateStrokePosition();

    // Handle resize
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateStrokePosition();
        }, 100);
    }

    if (config.adjustOnResize) {
        window.addEventListener('resize', handleResize);
    }

    // Mutation observer untuk perubahan pada elemen target
    const observer = new MutationObserver(updateStrokePosition);
    observer.observe(reffObject, {
        attributes: true,
        attributeFilter: ['style', 'class']
    });

    // Buat instance object
    const instance = {
        element: wrapper,
        pathElement: path,
        className: config.className,
        instanceId: instanceId,
        updateProgress: (newProgress) => {
            config.progress = Math.max(0, Math.min(100, newProgress));
            const pathLength = path.getTotalLength();
            const visibleLength = (pathLength * config.progress) / 100;
            path.setAttribute('stroke-dasharray', `${visibleLength} ${pathLength}`);
        },
        updateConfig: (newConfig) => {
            Object.assign(config, newConfig);
            updateStrokePosition();
        },
        remove: () => {
            if (config.adjustOnResize) {
                window.removeEventListener('resize', handleResize);
            }
            observer.disconnect();
            document.body.removeChild(wrapper);
            delete strokeInstances[instanceId];
        }
    };

    // Simpan instance ke dalam storage
    strokeInstances[instanceId] = instance;

    return instance;
}

// Fungsi untuk mengupdate progress berdasarkan className
function updateStrokeProgress(className, newProgress) {
    // Cari semua instance dengan className yang sesuai
    const instances = Object.values(strokeInstances).filter(
        instance => instance.className === className
    );
    
    if (instances.length === 0) {
        console.warn(`Tidak ditemukan stroke dengan class "${className}"`);
        return;
    }
    
    // Update semua instance yang cocok
    instances.forEach(instance => {
        instance.updateProgress(newProgress);
    });
}

// Fungsi untuk menghapus stroke berdasarkan className
function removeStrokeByClass(className) {
    const instances = Object.values(strokeInstances).filter(
        instance => instance.className === className
    );
    
    if (instances.length === 0) {
        console.warn(`Tidak ditemukan stroke dengan class "${className}"`);
        return;
    }
    
    instances.forEach(instance => {
        instance.remove();
    });
}