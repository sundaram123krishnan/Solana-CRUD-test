/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/StudentDataModule.json`.
 */
export type StudentDataModule = {
  "address": "AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ",
  "metadata": {
    "name": "studentDataModule",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createStudent",
      "discriminator": [
        78,
        190,
        199,
        71,
        237,
        199,
        19,
        201
      ],
      "accounts": [
        {
          "name": "studentDetails",
          "writable": true,
          "signer": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "rollNo",
          "type": "u32"
        },
        {
          "name": "courseName",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteStudent",
      "discriminator": [
        161,
        228,
        26,
        208,
        119,
        33,
        103,
        190
      ],
      "accounts": [
        {
          "name": "studentDelete",
          "writable": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "updateStudent",
      "discriminator": [
        208,
        104,
        170,
        157,
        94,
        249,
        7,
        125
      ],
      "accounts": [
        {
          "name": "studentUpdate",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "newName",
          "type": "string"
        },
        {
          "name": "newRollNo",
          "type": "u32"
        },
        {
          "name": "newCourseName",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "studentData",
      "discriminator": [
        170,
        185,
        166,
        151,
        138,
        238,
        50,
        101
      ]
    }
  ],
  "types": [
    {
      "name": "studentData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "studentId",
            "type": "pubkey"
          },
          {
            "name": "studentName",
            "type": "string"
          },
          {
            "name": "studentRollNo",
            "type": "u32"
          },
          {
            "name": "studentCourseName",
            "type": "string"
          }
        ]
      }
    }
  ]
};
