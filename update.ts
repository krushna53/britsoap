import { Project, SyntaxKind, StringLiteral } from "ts-morph";

function toTitleCase(str: string): string {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

function fixAV(str: string): string {
    return str.replace(/\bAv\b/gi, "AV").replace(/\bHsb\b/gi, "HSB");
}

const project = new Project();
project.addSourceFilesAtPaths("data/**/*.ts");

const sourceFile = project.getSourceFileOrThrow("data/productPages.ts");

const titleKeys = [
    "title",
    "processTitle",
    "importanceTitle",
    "applicationTitle",
    "capacityTitle",
    "configurationsTitle",
    "whyTitle",
];

const arrayStringKeys = [
    "importance",
    "capacities",
    "paragraphs"
];

// We want to apply title case to all specific titles, and uppercase AV globally in all strings.
sourceFile.getDescendantsOfKind(SyntaxKind.PropertyAssignment).forEach(prop => {
    const name = prop.getName();
    
    // Title Case specific fields
    if (titleKeys.includes(name)) {
        const initializer = prop.getInitializerIfKind(SyntaxKind.StringLiteral);
        if (initializer) {
            let val = initializer.getLiteralValue();
            val = toTitleCase(val);
            val = fixAV(val);
            initializer.setLiteralValue(val);
        }
    }
});

// For all string literals anywhere in the file, ensure AV and HSB are uppercase
sourceFile.getDescendantsOfKind(SyntaxKind.StringLiteral).forEach(strNode => {
    let val = strNode.getLiteralValue();
    if (/\b(Av|Hsb)\b/i.test(val)) {
        let newVal = fixAV(val);
        if (val !== newVal) {
            strNode.setLiteralValue(newVal);
        }
    }
});

sourceFile.saveSync();
console.log("Updated casing in productPages.ts");
