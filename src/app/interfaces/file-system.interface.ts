export interface FileSystemInterface {
	/**
	 * Return the string data of the requested filename
	 *
	 * @param type
	 * @param filename full system path
	 */
	path(type, filename);

	/**
	 * Return the string data of the requested filename
	 *
	 * @param type
	 * @param filename full system path
	 */
	read(type, filename);

	/**
	 * write the string value tot he request filename
	 *
	 * @param type
	 * @param filename full system path
	 * @param data string value to save
	 */
	write(type, filename, data): void;

	/**
	 * returns a json list of folder contents
	 *
	 * @param type
	 * @param dirname full system path
	 */
	list(type, dirname): any;

	/**
	 * make a dir, return result as a boolean
	 *
	 * @param type
	 * @param dirname full system path
	 */
	mkdir(type, dirname): void;

	/**
	 * check if a path.. dir or filename exsists in the filesystem
	 *
	 * @param type
	 * @param pathname full system path
	 */
	exists(type, pathname): boolean;
}
