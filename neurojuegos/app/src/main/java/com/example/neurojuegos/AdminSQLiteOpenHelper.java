    package com.example.neurojuegos;

    import android.content.Context;
    import android.database.sqlite.SQLiteDatabase;
    import android.database.sqlite.SQLiteOpenHelper;

    import androidx.annotation.Nullable;

    public class AdminSQLiteOpenHelper extends SQLiteOpenHelper {

        private static final int DATABASE_VERSION = 2;
        private static final String DATABASE_NAME = "administracion";

        public AdminSQLiteOpenHelper(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
            super(context, name, factory, version);
        }

        @Override
        public void onCreate(SQLiteDatabase db ) {
            db.execSQL("CREATE TABLE datos (nombre TEXT PRIMARY KEY, edad INTEGER, puntuaje INTEGER, puntuacionFrasesVoF REAL DEFAULT 0, puntuacionIdentifica REAL DEFAULT 0, puntuacionPatrones REAL DEFAULT 0, puntuacionCadenaNum REAL DEFAULT 0, puntuacionPalabrasEncad REAL DEFAULT 0, puntuacionMemo REAL DEFAULT 0, nivel REAL DEFAULT 0, nivel_maxIdentifica REAL DEFAULT 0, nivel_maxAdivina REAL DEFAULT 0, nivel_maxPalabras REAL DEFAULT 0, nivel_maxPatrones REAL DEFAULT 0, nivel_maxMemo REAL DEFAULT 0, nivel_maxRecuerda REAL DEFAULT 0, puntuacion_general REAL DEFAULT 0, variable1 REAL DEFAULT 0, variable2 REAL DEFAULT 0, por_si_acaso TEXT )" );

             }

        @Override
        public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

        }
    }
