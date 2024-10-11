/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/SolanaCRUD.json`.
 */
export type SolanaCrud = {
  "address": "GCPpE6am6ZTXoRq1ptUPCzCV5gAfxBBadu19q1pfc8DW",
  "metadata": {
    "name": "solanaCrud",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initializeStudent",
      "discriminator": [
        112,
        55,
        47,
        7,
        217,
        128,
        228,
        180
      ],
      "accounts": [
        {
          "name": "studentInitialization",
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
      "args": []
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
