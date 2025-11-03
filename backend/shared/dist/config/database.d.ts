import mongoose from 'mongoose';
interface DatabaseConfig {
    uri: string;
    options?: mongoose.ConnectOptions;
}
export declare const connectDatabase: (config: DatabaseConfig) => Promise<void>;
export declare const disconnectDatabase: () => Promise<void>;
export default connectDatabase;
//# sourceMappingURL=database.d.ts.map