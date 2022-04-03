// Target
interface FileIO {
  readFromFile(filename: string): void;
  writeToFile(fileName: string): void;
  setValue(key: string, value: string): void;
  getValue(key: string): string;
}

class FileProperties implements FileIO {
  private reader: FileReader;
  private writer: FileWriter;
  constructor(reader: FileReader, writer: FileWriter) {
    this.reader = reader;
    this.writer = writer;
  }
  public readFromFile(filename: string): void {
    this.reader.readAsText;
  }
}
