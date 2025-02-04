import { NextResponse } from 'next/server';

type FileData = {
  name: string;
  type: string;
  size: number;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    // Process file metadata
    const filesInfo: FileData[] = files.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size
    }));

    return NextResponse.json(
      { 
        message: 'Files processed successfully',
        files: filesInfo 
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Upload error:', error.message);
    } else {
      console.error('Unknown upload error occurred');
    }

    return NextResponse.json(
      { error: 'Failed to process files' },
      { status: 500 }
    );
  }
}