import * as THREE from 'three';

// Manages barcode textures and applies stickers to spheres; reusable across plots.
export class BarcodeStickerManager {
    constructor({ stickerSizeFraction = 0.8, barcodeVariants = [], barcodeUrl } = {}) {
        this.stickerSizeFraction = stickerSizeFraction;
        const variants = Array.isArray(barcodeVariants) ? barcodeVariants.filter(Boolean) : [];
        this.variants = variants.length ? variants : (barcodeUrl ? [barcodeUrl] : []);
        this.textures = new Map();
    }

    dispose() {
        this.textures.forEach(entry => {
            if (entry?.texture) entry.texture.dispose();
        });
        this.textures.clear();
    }

    attachSticker(sphere, radius, opacity, variantOverride) {
        const url = this._chooseUrl(variantOverride);
        if (!url) return;
        const entry = this._ensureTexture(url);
        if (!entry) return;
        if (entry.ready) {
            this._attachStickerMesh(sphere, radius, opacity, entry.texture);
        } else {
            entry.pending.push({ sphere, radius, opacity });
        }
    }

    _chooseUrl(variantOverride) {
        if (variantOverride) return variantOverride;
        if (!this.variants.length) return null;
        const idx = Math.floor(Math.random() * this.variants.length);
        return this.variants[idx];
    }

    _ensureTexture(url) {
        if (!url) return null;
        if (this.textures.has(url)) return this.textures.get(url);

        const texture = new THREE.Texture();
        const entry = { texture, ready: false, pending: [] };
        this.textures.set(url, entry);

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width  = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 512, 512);
            const imageData = ctx.getImageData(0, 0, 512, 512);
            const px = imageData.data;
            for (let i = 0; i < px.length; i += 4) {
                if ((px[i] + px[i + 1] + px[i + 2]) / 3 > 180) px[i + 3] = 0;
            }
            ctx.putImageData(imageData, 0, 0);
            texture.image       = canvas;
            texture.needsUpdate = true;
            entry.ready = true;
            entry.pending.forEach(({ sphere, radius, opacity }) =>
                this._attachStickerMesh(sphere, radius, opacity, texture));
            entry.pending = [];
        };
        img.src = url;

        return entry;
    }

    _attachStickerMesh(sphere, radius, opacity, texture) {
        if (!texture) return;
        const halfAngle = this.stickerSizeFraction / 2;
        const geo = new THREE.SphereGeometry(
            radius * 1.005, 16, 16,
            Math.PI / 2 - halfAngle, halfAngle * 2,
            Math.PI / 2 - halfAngle, halfAngle * 2,
        );
        const mat = new THREE.MeshBasicMaterial({
            map:         texture,
            transparent: true,
            opacity: opacity*0.75,
            blending:    THREE.NormalBlending,
            depthWrite:  false,
        });
        const sticker = new THREE.Mesh(geo, mat);
        sticker.renderOrder = 1;
        sphere.add(sticker);
    }
}
